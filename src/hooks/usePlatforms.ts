import platforms from "../data/platforms";

interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () => ({
  data: platforms.results,
  isLoading: false,
  error: null,
});

export default usePlatforms;
