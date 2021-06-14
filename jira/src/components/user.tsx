import React, { useEffect } from 'react';
import { SelectId } from 'components/selectId';
import { User } from 'screens/projectList/searchPanel';
import { useHttp } from 'utils/http';
import { useAsync } from 'utils/useAsync';
import { cleanObject } from 'utils/index';

export const useUsers = (param?: Partial<User>) => {
  const request = useHttp()
  const { handleRunPromise, ...result } = useAsync<User[]>();

  useEffect(() => {
    handleRunPromise(request("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const UserSelect = (props: React.ComponentProps<typeof SelectId>) => {
  const { data: users } = useUsers()
  return <SelectId options={users || []} {...props} />
}