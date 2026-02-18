
import { useState, useEffect } from 'react';

export const useImagePreloader = (imageArray: string[]) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const imagesToLoad = imageArray.length;
        const loadedImages: HTMLImageElement[] = [];

        const onLoad = () => {
            loadedCount++;
            if (loadedCount === imagesToLoad) {
                setLoaded(true);
            }
        };

        imageArray.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = onLoad;
            loadedImages[index] = img;
        });

        setImages(loadedImages);
    }, [imageArray]);

    return { images, loaded };
};
