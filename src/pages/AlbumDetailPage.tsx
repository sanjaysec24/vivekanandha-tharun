import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Calendar, Image, ArrowLeft, Maximize2 } from 'lucide-react';
import { doc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useParams, useRouter } from '../lib/router';

function parseFirestoreDate(val: any): Date | null {
  if (!val) return null;
  if (typeof val.toDate === 'function') {
    return val.toDate();
  }
  if (val.seconds !== undefined) {
    return new Date(val.seconds * 1000);
  }
  if (val instanceof Date) {
    return val;
  }
  if (typeof val === 'string' || typeof val === 'number') {
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      return d;
    }
  }
  return null;
}

export default function AlbumDetailPage() {
  const { albumId } = useParams();
  const { navigate } = useRouter();

  const [album, setAlbum] = useState<any | null>(null);
  const [loadingAlbum, setLoadingAlbum] = useState(true);
  
  const [photos, setPhotos] = useState<any[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // 1. Subscribe to specific album document
  useEffect(() => {
    if (!albumId || !db) {
      setLoadingAlbum(false);
      setError('Invalid album reference or database offline.');
      return;
    }

    const albumDocRef = doc(db, 'gallery_albums', albumId);
    const unsubscribe = onSnapshot(albumDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setAlbum({ id: docSnap.id, ...docSnap.data() });
        setError(null);
      } else {
        setError('Album not found');
      }
      setLoadingAlbum(false);
    }, (err) => {
      if ((import.meta as any).env?.DEV) {
        console.error('Error fetching album details:', err);
      }
      setError('Failed to fetch album details.');
      setLoadingAlbum(false);
    });

    return () => unsubscribe();
  }, [albumId]);

  // 2. Subscribe to photos belonging to this album
  useEffect(() => {
    if (!albumId || !db) {
      setLoadingPhotos(false);
      return;
    }

    const q = query(
      collection(db, 'gallery_photos'),
      where('albumId', '==', albumId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });

      // Sort client-side by order
      list.sort((a, b) => {
        const orderA = Number(a.order ?? 0);
        const orderB = Number(b.order ?? 0);
        return orderA - orderB;
      });

      setPhotos(list);
      setLoadingPhotos(false);
    }, (err) => {
      if ((import.meta as any).env?.DEV) {
        console.error('Error fetching album photos:', err);
      }
      setLoadingPhotos(false);
    });

    return () => unsubscribe();
  }, [albumId]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null || photos.length === 0) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null || photos.length === 0) return;
    setLightboxIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handleBackToGallery = () => {
    navigate('/gallery');
  };

  const eventDateStr = useMemo(() => {
    if (!album) return '';
    const dateVal = album.eventDate || album.createdAt;
    const parsed = parseFirestoreDate(dateVal);
    if (!parsed) return '';
    return parsed.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [album]);

  // Loading indicator / Skeleton structure
  if (loadingAlbum) {
    return (
      <div className="bg-[#F5F1EB] min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center space-y-6">
        <div className="w-full max-w-4xl space-y-8 animate-pulse">
          {/* Back btn skeleton */}
          <div className="h-6 w-32 bg-[#3B231A]/10 rounded-md" />
          {/* Title skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-24 bg-[#3B231A]/10 rounded-md" />
            <div className="h-10 w-2/3 bg-[#3B231A]/10 rounded-md" />
            <div className="h-5 w-1/2 bg-[#3B231A]/10 rounded-md" />
          </div>
          {/* Cover image skeleton */}
          <div className="w-full aspect-[16/9] bg-[#3B231A]/5 rounded-[32px] flex items-center justify-center">
            <div className="text-center text-[#3B231A]/40 space-y-2">
              <Image className="w-8 h-8 mx-auto animate-bounce" />
              <p className="text-xs font-mono tracking-widest uppercase">Gathering memories...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="bg-[#F5F1EB] min-h-screen flex flex-col items-center justify-center py-24 px-6 text-center space-y-6">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-red-100 shadow-sm">
          <X className="w-10 h-10" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-serif font-bold text-[#3B231A]">Album Not Found</h2>
          <p className="text-xs text-[#3B231A]/60 font-light leading-relaxed">
            The archive you are looking for might have been archived, deactivated, or moved.
          </p>
        </div>
        <button
          onClick={handleBackToGallery}
          className="px-6 py-3 bg-[#E78F68] hover:bg-[#cf744d] text-white font-mono font-bold uppercase text-xs tracking-wider rounded-xl transition-colors duration-300 flex items-center space-x-2 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Gallery</span>
        </button>
      </div>
    );
  }

  const coverImgUrl = album.coverImageUrl || album.coverImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F5F1EB] min-h-screen text-[#3B231A] overflow-x-hidden"
    >
      {/* Editorial Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-4">
        <button
          onClick={handleBackToGallery}
          className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[#3B231A]/70 hover:text-[#E78F68] transition-colors duration-300 py-2 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Gallery</span>
        </button>
      </div>

      {/* Cinematic Album Hero banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-12">
        <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#3B231A] text-[#F5F1EB] min-h-[360px] sm:min-h-[460px] flex flex-col justify-end border border-[#3B231A]/10 shadow-[0_20px_50px_rgba(59,35,26,0.15)]">
          {/* Background image cover */}
          <div className="absolute inset-0 z-0">
            <img
              src={coverImgUrl}
              alt={album.title}
              className="w-full h-full object-cover opacity-35 scale-100 animate-pulse duration-4000"
              style={{ animationDuration: '8s' }}
              referrerPolicy="no-referrer"
            />
            {/* Cinematic subtle gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#26150F] via-[#3B231A]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#26150F]/70 via-transparent to-transparent hidden md:block" />
          </div>

          {/* Hero details overlay contents */}
          <div className="relative z-10 p-6 sm:p-10 md:p-16 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#E78F68] bg-[#E78F68]/15 border border-[#E78F68]/25 px-3 py-1 rounded-full">
                {album.category || 'General'}
              </span>
              {eventDateStr && (
                <span className="flex items-center text-[10px] sm:text-xs text-white/80 font-mono gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-[#E78F68]" />
                  {eventDateStr}
                </span>
              )}
              <span className="text-[10px] sm:text-xs font-mono text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {photos.length} Memories
              </span>
            </div>

            <p className="text-[9px] sm:text-[10px] font-mono tracking-widest text-white/60 uppercase font-bold">
              Memories from Vivekanandha
            </p>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-none drop-shadow-sm">
              {album.title}
            </h1>

            {album.description && (
              <p className="text-xs sm:text-sm md:text-base text-white/80 font-light max-w-2xl leading-relaxed">
                {album.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Editorial Album Story Header & Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 text-center sm:text-left">
        <div className="border-b border-[#3B231A]/10 pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3B231A]">
              Moments We’ll Remember
            </h3>
            <p className="text-xs text-[#3B231A]/60 font-light font-sans">
              Take a walk down memory lane to discover the happiness, achievements, and play cycles.
            </p>
          </div>
          <div className="text-xs sm:text-sm font-mono text-[#3B231A]/70">
            Explore <span className="font-bold text-[#E78F68]">{photos.length}</span> archives
          </div>
        </div>
      </div>

      {/* Photos Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-24">
        
        {loadingPhotos ? (
          /* Staggered Skeletons */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className={`bg-white rounded-2xl border border-[#3B231A]/5 p-2 animate-pulse ${
                  i % 3 === 0 ? 'h-64 md:col-span-2' : 'h-48'
                }`}
              >
                <div className="w-full h-full bg-[#3B231A]/5 rounded-xl" />
              </div>
            ))}
          </div>
        ) : photos.length === 0 ? (
          /* Empty Album State */
          <div className="text-center py-20 px-6 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-[#3B231A]/5 rounded-full flex items-center justify-center mx-auto text-[#3B231A]/40">
              <Image className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold">Waiting for its Memories</h3>
              <p className="text-xs text-[#3B231A]/60 font-light">
                Our administrators are currently gathering and uploading photos for this album. Please check back shortly.
              </p>
            </div>
          </div>
        ) : (
          /* Mixed Editorial Custom Storytelling Grid (Supports 1-20+ perfectly, no ugly crops) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-auto">
            {photos.map((photo, index) => {
              // Custom pattern grid-spanning classes for desktop
              let gridClasses = 'col-span-1';
              let aspectClasses = 'aspect-square';

              if (index % 5 === 0) {
                // Large hero layout item
                gridClasses = 'sm:col-span-2 md:col-span-2 md:row-span-2';
                aspectClasses = 'aspect-[4/3] sm:aspect-square md:aspect-[4/3]';
              } else if (index % 5 === 1) {
                // Tall item
                gridClasses = 'col-span-1';
                aspectClasses = 'aspect-[3/4] sm:aspect-square md:aspect-[3/4]';
              } else if (index % 5 === 4) {
                // Wide row landscape item
                gridClasses = 'sm:col-span-2 md:col-span-2';
                aspectClasses = 'aspect-[16/10] sm:aspect-video md:aspect-[16/10]';
              }

              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
                  whileHover={{ y: -4 }}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative bg-white rounded-[20px] sm:rounded-[24px] border border-[#3B231A]/10 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 p-1.5 sm:p-2 box-border ${gridClasses}`}
                >
                  <div className={`w-full overflow-hidden rounded-[14px] sm:rounded-[18px] bg-[#3B231A]/5 relative ${aspectClasses}`}>
                    <img
                      src={photo.imageUrl || photo.url}
                      alt={photo.caption || 'School Photo'}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#26150F]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-[#F5F1EB]">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono tracking-wider uppercase text-[#E78F68] font-bold">
                            {photo.category || album.category || 'Memory'}
                          </span>
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-white line-clamp-1">
                            {photo.caption || photo.title || 'View memory'}
                          </h4>
                        </div>
                        <div className="p-2 rounded-full bg-white/10 backdrop-blur-xs text-white hover:bg-white/20 transition-all">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Redesigned Fullscreen Photo Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-[#1E1B18]/98 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Cross Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 text-white/70 hover:text-[#E78F68] hover:bg-white/5 border border-white/10 rounded-full transition-all duration-200 z-50 cursor-pointer active:scale-95"
              aria-label="Close Fullscreen Viewer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Previous Arrow Selector */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-white/5 hover:bg-[#E78F68] border border-white/10 text-white/70 hover:text-white rounded-full transition-all duration-200 z-50 cursor-pointer active:scale-95"
                  aria-label="Previous Memory"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-white/5 hover:bg-[#E78F68] border border-white/10 text-white/70 hover:text-white rounded-full transition-all duration-200 z-50 cursor-pointer active:scale-95"
                  aria-label="Next Memory"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Lightbox Primary Frame Area */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full flex flex-col items-center justify-center space-y-4 max-h-[90vh] box-border"
            >
              {/* Image Container with strict viewport constraint */}
              <div className="w-full flex items-center justify-center relative overflow-hidden h-[55vh] sm:h-[65vh] md:h-[70vh]">
                <img
                  src={photos[lightboxIndex]?.imageUrl || photos[lightboxIndex]?.url}
                  alt={photos[lightboxIndex]?.caption || 'Fullscreen photo'}
                  className="max-w-full max-h-full object-contain rounded-xl select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption details box */}
              <div className="text-center text-[#F5F1EB] max-w-2xl px-4 space-y-1 select-none">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#E78F68] font-bold">
                  {photos[lightboxIndex]?.category || album.category || 'General'}
                </span>
                <h3 className="text-base sm:text-xl font-serif font-bold text-white leading-tight">
                  {photos[lightboxIndex]?.caption || photos[lightboxIndex]?.title || `Photo ${lightboxIndex + 1} of ${photos.length}`}
                </h3>
                {photos[lightboxIndex]?.altText && (
                  <p className="text-xs sm:text-sm text-[#F5F1EB]/70 font-light max-w-lg mx-auto leading-relaxed">
                    {photos[lightboxIndex].altText}
                  </p>
                )}
                
                {/* Count tracker indicators */}
                <div className="text-[10px] font-mono text-[#F5F1EB]/40 pt-1">
                  {String(lightboxIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
