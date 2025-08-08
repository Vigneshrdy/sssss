"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { TypeIcon as type, type LucideIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Listen for modal state changes
    const handleModalOpen = () => setIsModalOpen(true)
    const handleModalClose = () => setIsModalOpen(false)
    
    handleResize()
    window.addEventListener("resize", handleResize)
    
    // Listen for body overflow changes to detect modal state
    const observer = new MutationObserver(() => {
      setIsModalOpen(document.body.style.overflow === 'hidden')
    })
    
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['style'] 
    })
    
    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-40 mb-6 sm:pt-6 transition-opacity duration-300",
        isModalOpen && "opacity-50 pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-white/10 border border-amber-200/30 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name)
                scrollToSection(item.url.replace('#', ''))
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-amber-800/80 hover:text-amber-900",
                isActive && "bg-amber-100/50 text-amber-900",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-amber-400/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-600 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-amber-400/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-amber-400/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-amber-400/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
