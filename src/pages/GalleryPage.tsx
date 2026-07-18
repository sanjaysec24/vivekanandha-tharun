import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Layers, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

const CATEGORIES = [
  { id: 'all', label: 'All Albums' },
  { id: 'campus', label: 'Campus' },
  { id: 'classrooms', label: 'Classrooms' },
  { id: 'activities', label: 'Activities' },
  { id: 'events', label: 'Events' },
  { id: 'annual day', label: 'Annual Day' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [albums, setAlbums] = useState<any[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [albumsError, setAlbumsError] = useState<string | null>(null);

  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // 1. Subscribe to published gallery albums in real-time
  useEffect(() => {
    if (!db) {
      setLoadingAlbums(false);
      setAlbumsError("Firestore database not initialized.");
      return;
    }

    const q = query(collection(db, 'gallery_albums'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push({ id: doc.id, ...data });
      });

      setAlbums(list);
      setLoadingAlbums(false);
      setAlbumsError(null);
    }, (err) => {
      console.error("Error loading gallery albums:", err);
      setAlbumsError("Failed to load school albums. Please try again later.");
      setLoadingAlbums(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Subscribe to photos of selected album in real-time
  useEffect(() => {
    if (!selectedAlbumId || !db) {
      setPhotos([]);
      return;
    }

    const q = query(
      collection(db, 'gallery_photos'),
      where('albumId', '==', selectedAlbumId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push({ id: doc.id, ...data });
      });

      // Avoid index error by sorting client-side
      list.sort((a, b) => {
        const orderA = Number(a.order ?? 0);
        const orderB = Number(b.order ?? 0);
        return orderA - orderB;
      });

      setPhotos(list);
      setLoadingPhotos(false);

      if (list.length > 0) {
        setLightboxIndex(0);
      } else {
        alert("This album doesn't contain any photos yet.");
        setSelectedAlbumId(null);
      }
    }, (err) => {
      console.error("Error loading album photos:", err);
      setLoadingPhotos(false);
      alert("Failed to load album photos. Please try again.");
      setSelectedAlbumId(null);
    });

    return () => unsubscribe();
  }, [selectedAlbumId]);

  // Filter & Normalize statuses/categories safely
  const publishedAlbums = albums.filter((album) => {
    const status = (album.status || '').toLowerCase().trim();
    return status === 'published';
  });

  // Sort albums: priority descending, then eventDate or createdAt descending
  const sortedAlbums = [...publishedAlbums].sort((a, b) => {
    const prioA = Number(a.priority ?? 0);
    const prioB = Number(b.priority ?? 0);
    if (prioB !== prioA) {
      return prioB - prioA;
    }
    
    // Safely extract dates
    const dateA = a.eventDate 
      ? new Date(a.eventDate).getTime() 
      : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);
    const dateB = b.eventDate 
      ? new Date(b.eventDate).getTime() 
      : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);
      
    return dateB - dateA;
  });

  const filteredAlbums = filter === 'all'
    ? sortedAlbums
    : sortedAlbums.filter((album) => {
        const albumCat = (album.category || '').toLowerCase().trim();
        const filterCat = filter.toLowerCase().trim();
        return albumCat === filterCat;
      });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handleAlbumClick = (albumId: string) => {
    setLoadingPhotos(true);
    setSelectedAlbumId(albumId);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setSelectedAlbumId(null);
  };

  // Find selected album details to show in lightbox as context
  const activeAlbum = albums.find(a => a.id === selectedAlbumId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F5F1EB] min-h-screen text-[#3B231A]"
    >
      {/* Banner */}
      <div className="relative overflow-hidden bg-[#3B231A] text-[#F5F1EB] py-20 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block bg-[#E78F68]/20 border border-[#E78F68]/30 text-[#E78F68] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Visual Memories
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            Our School <span className="text-[#E78F68] italic font-normal">Gallery</span>
          </h1>
          <p className="text-sm md:text-base text-[#F5F1EB]/80 max-w-2xl mx-auto font-light leading-relaxed">
            A window into the happy, vibrant moments of childhood learning, campus exploration, and traditional cultural festivals at our school.
          </p>
        </div>
      </div>

      {/* Filter Tabs and Photo Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
                filter === cat.id
                  ? 'bg-[#E78F68] text-white border-[#E78F68] shadow-sm scale-105'
                  : 'bg-white text-[#3B231A] hover:bg-[#3B231A]/5 border-[#3B231A]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loadingAlbums && (
          <div className="flex flex-col items-center justify-center py-24 text-[#3B231A]/70 space-y-3">
            <div className="w-8 h-8 border-4 border-[#E78F68] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono tracking-wider">Loading classical gallery albums...</p>
          </div>
        )}

        {/* Error State */}
        {!loadingAlbums && albumsError && (
          <div className="text-center py-16 bg-white rounded-3xl border border-red-100 p-8 max-w-md mx-auto space-y-4 shadow-sm">
            <p className="text-sm text-red-600 font-sans">{albumsError}</p>
          </div>
        )}

        {/* Empty State */}
        {!loadingAlbums && !albumsError && filteredAlbums.length === 0 && (
          <div className="text-center py-20 px-6 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-[#3B231A]/5 rounded-full flex items-center justify-center mx-auto text-[#3B231A]/40">
              <Layers className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold">No Albums Found</h3>
              <p className="text-xs text-[#3B231A]/60 font-light">
                We are currently organizing our visual archives. Please check back soon to explore our school's galleries.
              </p>
            </div>
          </div>
        )}

        {/* Responsive Album Grid */}
        {!loadingAlbums && !albumsError && filteredAlbums.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAlbums.map((album) => (
                <motion.div
                  key={album.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  onClick={() => handleAlbumClick(album.id)}
                  className="group relative aspect-[4/3] bg-white rounded-[24px] border border-[#3B231A]/10 shadow-sm overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <img
                    src={album.coverImageUrl || album.coverImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800'}
                    alt={album.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Matte Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B231A]/95 via-[#3B231A]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-[#F5F1EB] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E78F68] bg-[#E78F68]/15 px-2 py-0.5 rounded-full border border-[#E78F68]/20">
                        {album.category || 'general'}
                      </span>
                      <div className="flex items-center space-x-1.5 text-[10px] text-white/80 font-mono">
                        <Camera className="w-3.5 h-3.5 text-[#E78F68]" />
                        <span>{album.photoCount || 0} Photos</span>
                      </div>
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base leading-tight text-white">
                      {album.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-white/80 font-light line-clamp-2 leading-relaxed">
                      {album.description || 'No description provided.'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Loading Photos Overlay */}
      {loadingPhotos && (
        <div className="fixed inset-0 z-50 bg-[#1E1B18]/70 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-3">
          <div className="w-8 h-8 border-4 border-[#E78F68] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono tracking-wider text-[#F5F1EB]/90">Opening Album Archive...</p>
        </div>
      )}

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 bg-[#1E1B18]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col items-center space-y-4"
            >
              {/* Image Frame */}
              <div className="bg-[#3B231A] p-2 rounded-[24px] border border-white/10 shadow-2xl overflow-hidden aspect-[4/3] max-h-[70vh] flex items-center justify-center">
                <img
                  src={photos[lightboxIndex]?.imageUrl || photos[lightboxIndex]?.url}
                  alt={photos[lightboxIndex]?.caption || photos[lightboxIndex]?.altText || photos[lightboxIndex]?.title || 'School photo'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>

              {/* Caption Card */}
              <div className="text-center text-[#F5F1EB] max-w-xl space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E78F68] font-bold">
                  {photos[lightboxIndex]?.category || activeAlbum?.category || 'General'}
                </span>
                <h3 className="text-xl font-serif font-bold">
                  {photos[lightboxIndex]?.caption || photos[lightboxIndex]?.title || `Photo ${lightboxIndex + 1} of ${photos.length}`}
                </h3>
                {(photos[lightboxIndex]?.altText || photos[lightboxIndex]?.description) && (
                  <p className="text-xs text-[#F5F1EB]/70 font-sans font-light leading-relaxed">
                    {photos[lightboxIndex]?.altText || photos[lightboxIndex]?.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
