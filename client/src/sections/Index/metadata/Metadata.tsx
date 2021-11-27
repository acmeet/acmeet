import Input from '@/components/Input';
import TextArea from '@/components/Textarea';
import React, { Dispatch, memo, SetStateAction } from 'react';
import styles from './.module.scss';

interface MetadataProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

const Metadata = ({ title, setTitle, description, setDescription }: MetadataProps) => {
  return (
    <div className={styles['metadata']}>
      <Input
        type="text"
        className={styles['title-input']}
        placeholder="Meet title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        className={styles['description-input']}
        placeholder="Meet description"
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default memo(Metadata);