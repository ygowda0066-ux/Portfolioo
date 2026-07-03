export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'image';
  url: string; // Direct link or embed link
  thumbnailUrl: string;
}

export interface PortfolioConfig {
  personalInfo: {
    name: string;
    title: string;
    subtitle: string;
    bio: string;
    profilePicture: string;
    logo: string;
    email: string;
    whatsappNumber: string; // with country code, e.g. "919876543210"
  };
  socialLinks: {
    linkedin: string;
    instagram: string;
    gmail: string;
  };
  galleries: {
    travel: MediaItem[];
    commercial: MediaItem[];
    prewedding: MediaItem[];
  };
}

export const portfolioConfig: PortfolioConfig = {
  personalInfo: {
    name: "Yogesh Gowda S R(Green)",
    title: "Video Editor & Photographer",
    subtitle: "Green Films",
    bio: "I'm a Videographer, Photographer, Cinematographer, Video Editor, and FPV Drone Pilot passionate about cinematic storytelling. I specialize in travel, fashion, food, hospitality, and brand content, creating high-quality visuals from concept to final edit. Skilled in DaVinci Resolve, CapCut, Photoshop, and Lightroom, I focus on delivering creative and impactful content that brings every story to life.",
    profilePicture: "public/Profile.PNG",
    logo: "public/Green.PNG",
    email: "greenfilm0606@gmail.com",
    whatsappNumber: "917204130306" // Replace with your phone number (91 for India, followed by 10 digits)
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/yogesh-gowda-77bb5a41a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    instagram: "https://www.instagram.com/green_film06?igsh=NWFlczhscml1cmdr",
    gmail: "mailto:greenfilm0606@gmail.com"
  },
  galleries: {
    travel: [
      {
        id: "t1",
        title: "Hampi",
        description: "A UNESCO World Heritage Site in Karnataka, famous for its ancient temples, magnificent stone ruins, and rich cultural history.",
        type: "video",
        url: "public/Hampi.mp4",
        thumbnailUrl: "public/Hampi.PNG"
      },
      {
        id: "t2",
        title: "Varanasi",
        description: "One of the world’s oldest living cities, located on the banks of the River Ganges, renowned for its spiritual significance, sacred ghats, and vibrant cultural heritage.",
        type: "video",
        url: "public/Varanasi.mp4",
        thumbnailUrl: "public/Varanasi.PNG"
      },
      {
        id: "t3",
        title: "Ooty",
        description: "A beautiful hill station in Tamil Nadu known for its cool climate, tea gardens, scenic mountains, and peaceful landscapes.",
        type: "video",
        url: "public/Ooty.mp4",
        thumbnailUrl: "public/Ooty.png"
      }
    ],
    commercial: [
      {
        id: "c1",
        title: "Blood Donation Camp",
        description: "Capturing the spirit of kindness and community as people come together to donate blood and help save lives.",
        type: "video",
        url: "public/BloodCamp.mp4",
        thumbnailUrl: "public/Blood.jpeg"
      }
    
    ]
  }
};
