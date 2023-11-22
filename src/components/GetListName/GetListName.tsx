import React from 'react';

interface Props{
  name: string;
  onClick: () => void;
}
const GetListName: React.FC<Props> = ({name, onClick}) => {
  return (
    <div className="row">
      <div className="col-4 text-start">
        <div onClick={onClick}>{name}</div>
      </div>
    </div>
  );
};

export default GetListName;