"use client";

import { useState } from "react";
import { FaLink, FaCheck } from "react-icons/fa6";
import { useCopyToClipboard } from "usehooks-ts";

export default function CopyButton({ link }: { link: string }) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>(false);

  // Fungsi untuk mempersingkat tautan
  const shortenLink = (url: string, maxLength: number = 30) => {
    if (url.length <= maxLength) return url;
    return `${url.slice(0, maxLength)}...`;
  };

  return (
    <div
      className="bg-neutral-800 rounded-lg py-2 px-4 gap-16 flex items-center justify-between"
      onClick={() => {
        copy(link);
        setCopied(true);
      }}
      data-cy="copy-button"
      onMouseLeave={() =>
        setTimeout(() => {
          setCopied(false);
        }, 1000)
      }
    >
      <span className="text-sm">
        {copied ? "Link copied!" : shortenLink(link, 30)}
      </span>
      <div className="bg-gradient-to-r from-blue-800 to-black py-2 rounded-lg flex cursor-pointer items-center justify-center gap-2 px-4 hover:hover:opacity-[0.8]">
        <span>Copy</span>
        {copied ? (
          <FaCheck className="text-xl" data-cy="check-icon" />
        ) : (
          <FaLink className="text-xl" data-cy="link-icon" />
        )}
      </div>
    </div>
  );
}
