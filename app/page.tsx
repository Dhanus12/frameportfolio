import HeroScroll from "@/components/hero/HeroScroll";
import SkillsOverlay from "@/components/skills/SkillsOverlay";
import ProjectEarth from "@/components/projects/ProjectEarth";
import GlobalBackground from "@/components/GlobalBackground";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-black min-h-screen relative">
      <GlobalBackground />
      <HeroScroll />
      <div className="relative z-20 -mt-[50vh] bg-gradient-to-b from-transparent via-black/80 to-black">
        <SkillsOverlay />
      </div>
      <div className="relative z-20">
        <ProjectEarth />
      </div>
    </main>
  );
}
