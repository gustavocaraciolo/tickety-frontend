"use client";

import { useState } from "react";
import { default as NextImage, ImageProps } from "next/image";

const Image = ({ className, alt = "", src, ...props }: ImageProps) => {
    const [loaded, setLoaded] = useState(false);

    // Não renderizar se src estiver vazio ou undefined
    if (!src || src === "") {
        return null;
    }

    return (
        <NextImage
            className={`inline-block align-top opacity-0 transition-opacity ${
                loaded && "opacity-100"
            } ${className || ""}`}
            onLoad={() => setLoaded(true)}
            alt={alt}
            src={src}
            {...props}
        />
    );
};

export default Image;
