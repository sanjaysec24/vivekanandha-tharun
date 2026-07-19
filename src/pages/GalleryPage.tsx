import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Layers, ArrowRight } from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter } from '../lib/router';

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
  
  const { navigate } = useRouter();

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
      if ((import.meta as any).env?.DEV) {
        console.error("Error loading gallery albums:", err);
      }
      setAlbumsError("Failed to load school albums. Please try again later.");
      setLoadingAlbums(false);
    });

    return () => unsubscribe();
  }, []);

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

  const handleAlbumClick = (albumId: string) => {
    navigate(`/gallery/${albumId}`);
  };

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
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAlbums.map((album) => (
                <motion.div
                  key={album.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  onClick={() => handleAlbumClick(album.id)}
                  className="group relative aspect-[4/3] bg-white rounded-[24px] border border-[#3B231A]/10 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Image with subtle zoom */}
                  <img
                    src={album.coverImageUrl || album.coverImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800'}
                    alt={album.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Refined Gradient Matte Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26150F] via-[#3B231A]/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-[#F5F1EB] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E78F68] bg-[#E78F68]/15 px-2 py-0.5 rounded-full border border-[#E78F68]/20 transition-transform duration-300 group-hover:scale-105">
                        {album.category || 'general'}
                      </span>
                      <div className="flex items-center space-x-1.5 text-[10px] text-white/85 font-mono">
                        <Camera className="w-3.5 h-3.5 text-[#E78F68]" />
                        <span>{album.photoCount || 0} Photos</span>
                      </div>
                    </div>
                    
                    <h4 className="font-serif font-bold text-sm sm:text-base leading-tight text-white group-hover:text-[#E78F68] transition-colors duration-300">
                      {album.title}
                    </h4>
                    
                    <p className="text-[10px] sm:text-xs text-white/80 font-light line-clamp-2 leading-relaxed">
                      {album.description || 'No description provided.'}
                    </p>

                    {/* Explore Album Indication */}
                    <div className="pt-2 flex items-center space-x-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#E78F68] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>Explore Album</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
