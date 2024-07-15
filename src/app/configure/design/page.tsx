import DesignConfigurator from "./_components/DesignConfigurator";

const image = {
  width: 1080,
  height: 1920,
  src: "/testimonials/4.png",
};

const aspect = image.width / image.height;

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id: string | undefined;
  };
}) {
  const configId = searchParams.id;

  return <DesignConfigurator img={{ aspect: aspect, src: image.src }} />;
}
