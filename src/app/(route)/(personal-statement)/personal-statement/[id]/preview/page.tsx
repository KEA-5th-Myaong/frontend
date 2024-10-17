import BackButton from '../../../../../_components/BackButton';
import PSPreviewContainer from './_components/PSPreviewContainer';

export default function PersonalStatementPreview() {
  return (
    <section className="flex-center flex-col mx-auto w-full h-full pt-10 pb-32 px-8 max-w-[1000px] min-w-[360px]">
      <BackButton className="self-start pb-4" />
      <PSPreviewContainer />
    </section>
  );
}
