'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface ImageSliderProps {
  images: { id: number; name: string; description: string; image: string }[]
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      { threshold: 0.5 } // Trigger when 50% of the slider is visible
    )

    if (sliderRef.current) {
      observer.observe(sliderRef.current)
    }

    const timer = setInterval(() => {
      if (isInView) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }
    }, 5000)

    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [images.length, isInView])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div ref={sliderRef} className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[4/3]"
        >
          <Image
            src={images[currentIndex].image}
            alt={images[currentIndex].name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
            <h3 className="text-xl font-semibold mb-1">{images[currentIndex].name}</h3>
            <p className="text-sm">{images[currentIndex].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={handleNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

