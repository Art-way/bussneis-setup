'use client';

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import videoBg from "../../../../public/assets/img//pages/solution.jpg";
import styles from './video.module.css';

const Video = () => {
    const [openVideo, setOpenVideo] = useState(false);
    const dialogRef = useRef(null);
    const triggerRef = useRef(null);
    const titleId = useId();

    useEffect(() => {
      if (!openVideo) return;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = previousOverflow; };
    }, [openVideo]);

    const openVideoModal = () => {
      if (!dialogRef.current || dialogRef.current.open) return;
      setOpenVideo(true);
      dialogRef.current.showModal();
    };
    const closeVideoModal = () => {
      dialogRef.current?.close();
    };
    const handleClose = () => {
      setOpenVideo(false);
      triggerRef.current?.focus();
    };
    const handleBackdropClick = (event) => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeVideoModal();
    };

    return (
        <>
            <div className="solution__area section-padding" style={{backgroundImage: `url(${videoBg.src})`}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-9">
                            <div className="solution__area-title">
                                <span className="subtitle-two">Unlock Your Potential</span>
<h2 className="solution-title-visual">A Premier Business Hub, Your Gateway to Success.</h2>                                <Link className="btn-five" href="/contact">Book a Consultation<i className="far fa-chevron-double-right"></i></Link>
                            </div>					
                        </div>
                        <div className="col-xl-3">
                            <div className="solution__area-right">
                                <div className="solution__area-right-video">
                                    <div className={`solution__area-right-icon video video-pulse ${styles.playFrame}`}>
                                        <button ref={triggerRef} type="button" className={styles.playButton} onClick={openVideoModal} aria-label="Play video: Why Choose the UAE?" aria-haspopup="dialog"><i className="fas fa-play" aria-hidden="true"></i></button>
                                    </div>
                                    <h6>Why Choose the UAE?</h6>
                                </div>
                            </div>					
                        </div>
                    </div>
                </div>
            </div>
            <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId} onClose={handleClose} onCancel={(event) => { event.preventDefault(); closeVideoModal(); }} onClick={handleBackdropClick}>
              <div className={styles.dialogHeader}><h2 id={titleId}>Why Choose the UAE?</h2><button type="button" className={styles.closeButton} onClick={closeVideoModal} aria-label="Close video">×</button></div>
              {openVideo && <iframe className={styles.frame} src="https://www.youtube-nocookie.com/embed/33JjFWKUaQY?autoplay=1&rel=0" title="Why Choose the UAE? — video" allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}
            </dialog>
        </>
    );
};

export default Video;
