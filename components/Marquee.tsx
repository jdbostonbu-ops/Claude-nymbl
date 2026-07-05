import { audiences } from "@/site.config";

const Marquee = () => {
  // Duplicate the list so the -50% keyframe loops seamlessly.
  const doubled = [...audiences, ...audiences];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((label, index) => (
          <span className="marquee-item" key={`${label}-${index}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
