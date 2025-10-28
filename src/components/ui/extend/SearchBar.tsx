import { cn } from '@/lib/utils';
import SearchIcon from '../icons';
import { useState, type ChangeEvent } from 'react';
import Img from './Img';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { search } from '@/services/search';
import useDebounce from '@/hooks/useDebounce';

const variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

export default function SearchBar() {
  const [showData, setShowData] = useState(false);
  const [query, setQuery] = useState('');

  const { data } = useQuery({
    queryKey: ['search', query],
    queryFn: () => search(query),
    enabled: query.length > 0
  });
  const results = data?.results || null;

  const handleOnChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), 500);

  return (
    <div className="relative">
      <SearchIcon className="absolute end-0 top-1" size={21} />
      <input
        type="text"
        className={cn(
          'border-b-2 bg-transparent p-1 ps-7 text-sm opacity-55 transition-all',
          'focus:border-b-primary box-border focus:opacity-100 focus:outline-0'
        )}
        placeholder="بحث"
        dir="ltr"
        onFocus={() => setShowData(true)}
        onBlur={() => setShowData(false)}
        onChange={handleOnChange}
      />

      <AnimatePresence>
        {showData && (
          <motion.div
            key="dropdown"
            className="absolute end-0 top-10 w-2xs overflow-clip rounded-2xl border bg-white shadow-lg"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.28, ease: [0.16, 0.84, 0.33, 1] }}
            style={{ transformOrigin: 'top right' }}
          >
            <ul>
              {data?.empty || !data ? (
                <li className="text-muted w-full py-4 text-center text-sm">لا يوجد نتائج</li>
              ) : (
                <>
                  {results?.releases.map((release) => (
                    <li key={release.id} className="hover:bg-accent border-b-2">
                      <Link
                        to={'/إصدارات'}
                        className="flex cursor-pointer gap-2 px-4 py-2"
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <Img src={release.image} alt={release.title} className="h-9 w-9 rounded-sm object-cover" />
                        <div>
                          <p className="text-sm font-bold">{release.title}</p>
                          <p className="text-muted text-xs">إصدار</p>
                        </div>
                      </Link>
                    </li>
                  ))}

                  {results?.episodes.map((ep) => (
                    <li key={ep.id} className="hover:bg-accent border-b-2">
                      <Link
                        to={'/'}
                        className="flex cursor-pointer gap-2 px-4 py-2"
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <Img src={ep.cover_image} alt={ep.title} className="h-9 w-9 rounded-sm object-cover" />
                        <div>
                          <p className="text-sm font-bold">{ep.title}</p>
                          <p className="text-muted text-xs">فيديو</p>
                        </div>
                      </Link>
                    </li>
                  ))}

                  {results?.episodes.map((ep) => (
                    <li key={ep.id} className="hover:bg-accent border-b-2">
                      <Link
                        to={'/'}
                        className="flex cursor-pointer gap-2 px-4 py-2"
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <Img src={ep.cover_image} alt={ep.title} className="h-9 w-9 rounded-sm object-cover" />
                        <div>
                          <p className="text-sm font-bold">{ep.title}</p>
                          <p className="text-muted text-xs">بودكاست</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
