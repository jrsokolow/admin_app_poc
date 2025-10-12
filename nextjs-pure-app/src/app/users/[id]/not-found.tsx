import Link from 'next/link';
import { Button, Result } from 'antd';

export default function NotFound() {
    return (
        <div style={{ padding: '24px' }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the user you are looking for does not exist."
                extra={
                    <Link href="/users">
                        <Button type="primary">Back to Users List</Button>
                    </Link>
                }
            />
        </div>
    );
}

