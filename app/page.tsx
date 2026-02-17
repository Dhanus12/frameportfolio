import HeroSequence from "@/components/hero/HeroSequence";
import SkillsOverlay from "@/components/skills/SkillsOverlay";
import ProjectEarth from "@/components/projects/ProjectEarth";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <HeroSequence />
      <div className="relative z-20 -mt-[50vh] bg-gradient-to-b from-transparent via-black/80 to-black">
        <SkillsOverlay />
      </div>
      <ProjectEarth />
    </main>
  );
}
