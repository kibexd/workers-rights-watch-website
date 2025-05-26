'use client';

import { useEffect, useState } from "react";
import { Twitter } from "lucide-react";
import { motion } from "framer-motion";

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  public_metrics?: {
    like_count: number;
    reply_count: number;
  };
}

export default function TwitterFeed() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await fetch("/api/twitter");
        const data = await res.json();

        if (res.ok) {
          setTweets(data.data || []);
        } else {
          setError(data.error || "Failed to load tweets");
        }
      } catch (err) {
        setError("Network error");
        console.error("Twitter fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTweets();
  }, []);

  if (error) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(3).fill(0).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-[#111111] rounded-2xl p-6 h-full">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-700" />
                <div className="ml-4">
                  <div className="h-4 w-32 bg-gray-700 rounded" />
                  <div className="h-3 w-24 bg-gray-700 rounded mt-2" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tweets.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-gray-400">No tweets available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tweets.map((tweet, index) => (
        <motion.div
          key={tweet.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <div className="bg-[#111111] dark:bg-[#111111] light:bg-white rounded-2xl p-6 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center mr-4">
                <Twitter className="h-6 w-6 text-teal-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Workers Rights Watch</h3>
                <p className="text-sm text-gray-400">@Workersrights24</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 flex-grow">
              {tweet.text}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{new Date(tweet.created_at).toLocaleDateString()}</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {tweet.public_metrics?.like_count || 0}
                </span>
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {tweet.public_metrics?.reply_count || 0}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 