"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";

import CopyButton from "./copy";

interface IShare {
  Icon: IconType;
  link: string;
  style: string;
  label: string;
}

const share: IShare[] = [
  {
    Icon: FaFacebook,
    link: "https://www.facebook.com/sharer/sharer.php?u=",
    style: "text-white hover:opacity-[0.8]",
    label: "Share on Facebook",
  },
  {
    Icon: FaWhatsapp,
    link: "https://wa.me/?text=",
    style: "text-white hover:opacity-[0.8]",
    label: "Share on WhatsApp",
  },
  {
    Icon: FaLinkedin,
    link: "https://www.linkedin.com/sharing/share-offsite/?url=",
    style: "text-white hover:opacity-[0.8]",
    label: "Share on LinkedIn",
  },
  {
    Icon: FaXTwitter,
    link: "https://www.twitter.com/intent/tweet?url=",
    style: "text-white hover:opacity-[0.8]",
    label: "Share on Twitter",
  },
];

export default function Share({ slug }: { slug: string }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const domain = process.env.NEXT_PUBLIC_BASE_URL_FE;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className="md:px-4 px-0">
      <button
        onClick={openModal}
        className="bg-black bg-opacity-40 hover:bg-opacity-70 text-white md:px-4 px-2 py-2 rounded-xl flex items-center"
        aria-label="Open share modal"
      >
        <MdIosShare className="w-5 h-5" />
        <span className="pl-1">Share</span>
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 px-4 h-screen"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-neutral-900 p-6 rounded-2xl max-w-sm w-full sm:max-w-lg">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm md:text-base">
                Share this event with your friends
              </p>
              <button
                onClick={closeModal}
                className="text-2xl md:text-3xl font-bold text-neutral-500 hover:text-white"
                aria-label="Close share modal"
              >
                &times;
              </button>
            </div>
            <div className="mt-4 flex flex-col items-center gap-2">
              <CopyButton link={`${domain}/events/${slug}`} />
              <div className="border-t-0 border-x-0 border-b-2 border-neutral-600 w-full py-1" />

              {share.map((item, idx) => (
                <div key={idx} className="w-full">
                  <Link
                    href={`${item.link}${domain}/events/${slug}`}
                    className={item.style}
                    aria-label={item.label}
                  >
                    <div className="bg-neutral-800 rounded-lg py-3 px-3 md:py-4 md:px-4 flex items-center justify-between">
                      <span className="text-sm md:text-base">{item.label}</span>
                      <item.Icon className="text-lg md:text-2xl" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
