import DOMPurify from 'dompurify';

type Props = {
  content: string;
};

export default function InnerHTML({ content }: Props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} className="prose mt-4 max-w-none"></div>
  );
}
