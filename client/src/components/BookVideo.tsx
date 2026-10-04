import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";

type Book = { title: string; author: string; image: string; alt: string; video: string };

export function BookVideo({ book, index, total }: { book: Book; index: number; total: number }) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <Dialog open={open} onOpenChange={value => { setOpen(value); setFailed(false); }}>
      <DialogTrigger asChild>
        <button type="button" className="book-video-trigger" aria-label={`Watch video: ${book.title}`}>
          <div className="book-cover-wrap">
            <img src={book.image} alt={book.alt} className="book-cover" loading="lazy" />
            <span className="book-play-label"><Play size={15} aria-hidden="true" /> Watch video</span>
          </div>
          <div className="book-caption">
            <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <h3>{book.title}</h3>
            <p>By {book.author}</p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="book-video-dialog">
        <DialogTitle className="pr-6">{book.title}</DialogTitle>
        <DialogDescription>By {book.author}</DialogDescription>
        {open && <video src={book.video} controls autoPlay playsInline preload="none" aria-label={book.title} onError={() => setFailed(true)} />}
        {failed && <p role="alert">This video couldn’t load. <a href={book.video} className="underline">Open the video directly</a> or try again later.</p>}
      </DialogContent>
    </Dialog>
  );
}
