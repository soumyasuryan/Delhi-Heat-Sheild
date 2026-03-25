const Footer = () => (
  <footer className="border-t border-border py-10 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="font-display text-lg font-bold">
        Delhi's <span className="text-primary">HeatShield</span>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        A heat stress mapping & alert platform protecting Delhi's most vulnerable populations.
      </p>
      <p className="text-xs text-muted-foreground">© 2026 HeatShield</p>
    </div>
  </footer>
);

export default Footer;
