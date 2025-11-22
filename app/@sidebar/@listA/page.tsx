import { fetchSidebarApiA } from '@/app/utils/apicalls';

const getListDataA = async () => {
  const result = await fetchSidebarApiA();
  console.log(result);
};

export default function ListA() {
  const fetchListA = getListDataA();

  console.log('fetchign result..', fetchListA);
  return (
    <>
      <h1>List A</h1>
    </>
  );
}
