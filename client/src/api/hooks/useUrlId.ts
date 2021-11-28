import { useRouter } from 'next/router';

const _useUrlId = () => {
  const router = useRouter();
  const id = router.query?.id  ?? undefined;
  if (Array.isArray(id)) { return undefined; }
  return id;
};

export const useUrlId = () => {
  return _useUrlId() ?? '';
}