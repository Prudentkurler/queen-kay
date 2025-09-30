"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export const HeroSection = () => {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-start bg-cover bg-center rounded-lg"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent rounded-lg"></div>

      {/* Content */}
      <div className="relative z-10 max-w-xl md:max-w-2xl px-6 sm:px-8 lg:px-12 text-left text-white">
        {/* Headline with typewriter */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-extrabold leading-tight mb-4 h-[120px]" // 👈 prevents layout shift
        >
          <Typewriter
            options={{
              strings: [
                "Shop Smarter with Us",
                "Driven by Ethics, Powered by Trust",
                "Affordable Deals, Exceptional Value",
              ],
              autoStart: true,
              loop: true,
              delay: 60,
              deleteSpeed: 40,
            }}
          />
        </motion.h1>

        {/* Description shows with fade-in after typewriter starts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }} // 👈 appears after typewriter kicks in
          className="space-y-3"
        >
          <p className="text-lg md:text-xl text-violet-100 max-w-prose lg:mt-2">
            We bridge Africa to the world with{" "}
            <span className="font-semibold text-violet-300">
              direct imports from China
            </span>{" "}
            ensuring unbeatable preorder prices on quality items.
          </p>
          <p className="text-lg md:text-xl text-violet-100 max-w-prose">
            No middlemen, no hidden costs. Just{" "}
            <span className="underline decoration-violet-400 underline-offset-2">
              smooth shopping
            </span>{" "}
            and faster delivery straight to you.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }} // 👈 buttons come last
          className="flex flex-wrap gap-4 mt-6"
        >
          <Link href="/shop">
            <button className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-md transition">
              Shop Now
            </button>
          </Link>
          <Link href="/preorder">
            <button className="px-6 py-3 bg-white hover:bg-violet-100 text-violet-700 font-semibold rounded-lg shadow-md transition">
              Pre-order Deals
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
