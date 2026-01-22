import React from 'react';
import { FaGithub, FaTwitch, FaSpotify, FaSteam } from 'react-icons/fa';
import { FaServer } from 'react-icons/fa6';

export default function LinkSection({ isVisible }) {
  const links = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com/5XGhost143' },
    { icon: FaTwitch, label: 'Twitch', url: 'https://www.twitch.tv/gghost143' },
    { icon: FaSteam, label: 'Steam', url: 'https://steamcommunity.com/id/GHOST143/' },
    { icon: FaSpotify, label: 'Spotify', url: 'https://open.spotify.com/user/31snna5blfrzmagarfxqcfdyikau' },
    { icon: FaServer, label: 'Content Server', url: 'https://content.ghost143.de/admin' }
  ];

  return (
    <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} w-full max-w-md md:max-w-5xl px-4`}>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-neutral-800 border border-neutral-700 rounded-xl transition-all duration-300 hover:bg-white hover:border-white hover:scale-110 active:scale-95"
          >
            <link.icon className="w-7 h-7 md:w-8 md:h-8 text-white transition-colors duration-300 group-hover:text-black" />
            
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-white text-black text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {link.label}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}