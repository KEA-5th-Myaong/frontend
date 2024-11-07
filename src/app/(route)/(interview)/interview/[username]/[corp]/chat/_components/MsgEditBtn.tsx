import React from 'react';

interface MsgEditBtnProps {
  isEdit: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function MsgEditBtn({ isEdit, onEdit, onCancel, onSave }: MsgEditBtnProps) {
  return (
    <div className="flex gap-2">
      {isEdit ? (
        <>
          <button type="button" onClick={onCancel} className="text-xs text-gray-0 self-end pb-2 whitespace-nowrap">
            취소
          </button>
          <button type="button" onClick={onSave} className="text-xs text-gray-0 self-end pb-2 whitespace-nowrap">
            저장
          </button>
        </>
      ) : (
        <button type="button" onClick={onEdit} className="text-xs text-gray-0 self-end pb-2 whitespace-nowrap">
          수정
        </button>
      )}
    </div>
  );
}
