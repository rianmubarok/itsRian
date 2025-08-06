import Skills from "../shared/ui/Skills";

const SkillsSection = () => {
  return (
    <section className="space-y-5 text-primary-dark dark:text-primary-light">
      <div className="space-y-3">
        <h2 className="text-[32px] font-regular ">Tools that I have used</h2>
      </div>
      <Skills />
    </section>
  );
};

export default SkillsSection;
