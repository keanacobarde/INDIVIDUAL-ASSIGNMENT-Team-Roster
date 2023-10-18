import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../api/memberData';
import MemberForm from '../../../components/Forms/MemberForm';

export default function EditMember() {
  const [editMember, setEditMemeber] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditMemeber);
  }, [firebaseKey]);

  return (
    <MemberForm obj={editMember} />
  );
}
