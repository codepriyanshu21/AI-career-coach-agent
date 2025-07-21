"use client";

import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heroAnimation from "@/public/animations/hero.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-900">
        <nav className="relative mx-auto flex max-w-[85rem] items-center justify-between p-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Image src="/logo.png" alt="logo" width={150} height={150} />
          </div>
          <div className="flex items-center">
            {!user ? (
              <SignInButton mode="modal" signUpForceRedirectUrl={"/dashboard"}>
                <button className="rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-400 hover:text-blue-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-blue-500">
                  Get Started
                </button>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="bg-gradient-to-tl from-blue-600 to-violet-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl lg:text-7xl">
            Super charge with {""}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              AI Agents
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-neutral-400">
            Revolutionize your workflow with smart, intuitive AI agents built on
            modern web technologies.
          </p>
          <div className="mt-8">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-x-3 rounded-md border border-transparent bg-gradient-to-tr from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:from-violet-600 hover:to-blue-600"
            >
              Get Started
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 w-[300px] sm:w-[400px] lg:w-[500px]"
        >
          <Lottie animationData={heroAnimation} loop={true} />
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-[85rem] mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "📱",
              title: "25+ Templates",
              desc: "Responsive and mobile-first templates to kickstart your project.",
            },
            {
              icon: "🎨",
              title: "Customizable",
              desc: "Built with flexibility in mind, every component is fully customizable.",
            },
            {
              icon: "🚀",
              title: "Free to Use",
              desc: "Every plugin and asset is documented and ready to use.",
            },
            {
              icon: "📞",
              title: "24/7 Support",
              desc: "We’re here for you, whenever you need us.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ rotateY: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group rounded-xl bg-white p-6 text-center shadow-md transition-transform duration-300 hover:shadow-xl dark:bg-neutral-800"
              data-aos="fade-up"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white text-xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                {item.desc}
              </p>
              <a
                href="#"
                className="mt-3 inline-flex items-center text-sm text-blue-600 transition hover:underline"
              >
                Learn more
                <svg
                  className="ml-1 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </section>
      <footer className="text-center py-4 mt-2 text-sm text-gray-600">
        <p>
          © <span className="text-blue-600 font-semibold">2025 Priyanshu</span>{" "}
          — All rights reserved
        </p>
      </footer>
    </div>
  );
}
