import React from 'react';

interface Props{
  name: string;
  onClick: () => void;
}
const GetListName: React.FC<Props> = ({name, onClick}) => {
  return (
    <div onClick={onClick}>{name}</div>
  );
};

export default GetListName;