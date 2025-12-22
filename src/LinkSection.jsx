import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaTwitch } from 'react-icons/fa';
import { FaSpotify } from 'react-icons/fa';
import { FaSteam } from 'react-icons/fa';
import { FaFileContract } from 'react-icons/fa';

export default function LinkSection({ isVisible, isMobile }) {
  const links = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com/5XGhost143', color: 'hover:text-purple-400' },
    { icon: FaTwitch, label: 'Twitch', url: 'https://www.twitch.tv/gghost143', color: 'hover:text-blue-400' },
    { icon: FaSteam, label: 'Steam', url: 'https://steamcommunity.com/id/GHOST143/', color: 'hover:text-cyan-400' },
    { icon: FaSpotify, label: 'Spotify', url: 'https://open.spotify.com/user/31snna5blfrzmagarfxqcfdyikau', color: 'hover:text-pink-400' }
  ];

  return (
    <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} w-full max-w-md md:max-w-5xl px-4`}>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group relative overflow-hidden
              flex items-center justify-center p-3 sm:p-4 md:p-5
              bg-gradient-to-br from-gray-900/80 to-gray-800/60 
              backdrop-blur-lg border border-gray-700/50
              rounded-2xl transition-all duration-500 
              hover:scale-110 active:scale-95
              ${!isMobile ? 'hover:rotate-3 hover:-translate-y-2' : ''}
              hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5
              hover:border-white/30 ${link.color}
              hover:shadow-2xl hover:shadow-purple-500/20
              w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
              before:absolute before:inset-0 
              before:bg-gradient-to-br before:from-white/0 before:to-white/0
              hover:before:from-white/20 hover:before:to-white/5
              before:transition-all before:duration-500 before:rounded-2xl
              after:absolute after:inset-0 after:rounded-2xl
              after:bg-gradient-to-br after:from-transparent after:via-white/5 after:to-transparent
              after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
              ${isMobile ? 'cursor-pointer' : 'cursor-none'}
            `}
            style={{
              animationDelay: `${index * 150}ms`
            }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-cyan-500/0 group-hover:from-purple-500/30 group-hover:via-pink-500/30 group-hover:to-cyan-500/30 blur-xl transition-all duration-500 -z-10" />
            
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            <link.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-2xl relative z-10" />
            
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-sm border border-gray-700/50">
              {link.label}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-gray-700/50" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}