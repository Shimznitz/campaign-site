// components/Gallery.tsx
// Supports images, YouTube/Vimeo embeds, and direct video files
// (including Supabase Storage .mp4/.mov URLs).
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { CAMPAIGN } from "@/lib/config";
import styles from "./Gallery.module.css";

type GalleryItem = (typeof CAMPAIGN.gallery)[0] & { type?: string };

const getCategories = () => {
  const cats = Array.from(new Set(CAMPAIGN.gallery.map((g) => g.category)));
  return ["All", ...cats];
};

function isVideo(item: GalleryItem) {
  return (item as any).type === "video";
}

function isYouTube(src: string) {
  return src.includes("youtube.com") || src.includes("youtu.be");
}

function isVimeo(src: string) {
  return src.includes("vimeo.com");
}

function isDirectVideo(src: string) {
  return /\.(mp4|mov|webm|ogg)(\?|$)/i.test(src);
}

function getYouTubeId(src: string) {
  const match = src.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
}

function getVimeoId(src: string) {
  const match = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}

function getYouTubeThumbnail(src: string) {
  const id = getYouTubeId(src);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

// ── Thumbnail shown in the grid ──────────────────────────────
function GalleryThumb({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const video = isVideo(item);
  const ytThumb = video && isYouTube(item.src) ? getYouTubeThumbnail(item.src) : null;
  const direct = video && isDirectVideo(item.src);

  return (
    <div className={styles.masonryItem} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}>

      {/* Image */}
      {!video && (
        <Image
          src={item.src}
          alt={item.alt}
          width={600}
          height={420}
          style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
        />
      )}

      {/* YouTube — show thumbnail image */}
      {video && isYouTube(item.src) && ytThumb && (
        <div className={styles.videoThumb}>
          <Image
            src={ytThumb}
            alt={item.alt}
            width={600}
            height={420}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          <PlayIcon />
        </div>
      )}

      {/* Vimeo — show placeholder with play */}
      {video && isVimeo(item.src) && (
        <div className={styles.videoThumb}>
          <div className={styles.videoBg} />
          <PlayIcon />
        </div>
      )}

      {/* Direct video file — show first frame as poster */}
      {video && direct && (
        <div className={styles.videoThumb}>
          <video
            src={item.src}
            className={styles.videoPoster}
            muted
            playsInline
            preload="metadata"
            // Load only the first frame as a poster
            onLoadedMetadata={(e) => {
              (e.target as HTMLVideoElement).currentTime = 0.5;
            }}
          />
          <PlayIcon />
        </div>
      )}

      <div className={styles.masonryOverlay}>
        <span className={styles.masonryCategory}>
          {video ? "🎬 " : ""}{item.category}
        </span>
        <p className={styles.masonryAlt}>{item.alt}</p>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <div className={styles.playBadge}>
      <div className={styles.playCircle}>
        <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
          <polygon points="8,5 20,12 8,19" />
        </svg>
      </div>
    </div>
  );
}

// ── Lightbox content ─────────────────────────────────────────
function LightboxContent({ item }: { item: GalleryItem }) {
  const video = isVideo(item);

  if (!video) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        width={900}
        height={600}
        style={{ objectFit: "contain", width: "100%", height: "auto", borderRadius: 16, maxHeight: "75vh" }}
      />
    );
  }

  if (isYouTube(item.src)) {
    const id = getYouTubeId(item.src);
    return (
      <div className={styles.videoEmbed}>
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={item.alt}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    );
  }

  if (isVimeo(item.src)) {
    const id = getVimeoId(item.src);
    return (
      <div className={styles.videoEmbed}>
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1`}
          title={item.alt}
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    );
  }

  // Direct video file (Supabase Storage .mp4 / .mov etc.)
  return (
    <video
      src={item.src}
      controls
      autoPlay
      playsInline
      style={{
        width: "100%",
        borderRadius: 16,
        maxHeight: "75vh",
        background: "#000",
        display: "block",
      }}
    />
  );
}

// ── Main component ───────────────────────────────────────────
export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<null | GalleryItem>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const CATEGORIES = getCategories();

  const filtered =
    filter === "All"
      ? CAMPAIGN.gallery
      : CAMPAIGN.gallery.filter((g) => g.category === filter);

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">On the Ground</span>
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">
            Moments from the movement — communities, rallies, and real work.
          </p>
        </motion.div>

        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className={styles.masonry}>
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
              >
                <GalleryThumb
                  item={item as GalleryItem}
                  onClick={() => setLightbox(item as GalleryItem)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <LightboxContent item={lightbox} />
              <p className={styles.lightboxCaption}>{lightbox.alt}</p>
              <button
                className={styles.lightboxClose}
                onClick={() => setLightbox(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}