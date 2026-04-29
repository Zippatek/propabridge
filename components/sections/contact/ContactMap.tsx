export const ContactMap = () => {
  return (
    <section className="w-full h-[400px] md:h-[500px] mt-16 relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126487.64098935293!2d9.734568999999999!3d9.799757999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1054db22bc27fecf%3A0x6b29f9df36b4bc18!2sKanam%2C%20Plateau!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 grayscale-[20%] contrast-[95%] opacity-90"
      />
      {/* Overlay to catch pointer events if we want to disable zoom without ctrl */}
      <div className="absolute inset-0 pointer-events-none" />
    </section>
  );
};
