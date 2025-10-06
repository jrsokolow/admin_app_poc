import { useShow } from '@refinedev/core';
import { Show } from '@refinedev/antd';
import { Typography } from 'antd';

const { Title, Text } = Typography;

/**
 * REFINE USER SHOW
 * 
 * Key Features:
 * - Uses useShow() hook to fetch single record
 * - Hook returns queryResult with data and loading states
 * - You manually structure the display layout
 * - Complete flexibility in how data is presented
 * - Access to raw data for custom rendering
 */
export const UserShow = () => {
    // useShow hook fetches the record data
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>ID</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Name</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>Username</Title>
            <Text>{record?.username}</Text>

            <Title level={5}>Email</Title>
            <Text>{record?.email}</Text>

            <Title level={5}>Phone</Title>
            <Text>{record?.phone}</Text>

            <Title level={5}>Website</Title>
            <Text>{record?.website}</Text>

            <Title level={5}>Street</Title>
            <Text>{record?.address?.street}</Text>

            <Title level={5}>City</Title>
            <Text>{record?.address?.city}</Text>

            <Title level={5}>Zipcode</Title>
            <Text>{record?.address?.zipcode}</Text>

            <Title level={5}>Company Name</Title>
            <Text>{record?.company?.name}</Text>

            <Title level={5}>Company Catchphrase</Title>
            <Text>{record?.company?.catchPhrase}</Text>
        </Show>
    );
};

