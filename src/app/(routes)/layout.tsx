export default ({ children }: Props) => (
  <main id="root-layout" className="container p-2 mx-auto mb-12">
    {children}
  </main>
);

type Props = {
  children: React.ReactNode;
};
