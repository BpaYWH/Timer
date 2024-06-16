import { Title } from '@solidjs/meta';
import Timer from '~/components/Timer';

export default function Home() {
  return (
    <main>
      <Title>Timer</Title>
      <Timer />
    </main>
  );
}
