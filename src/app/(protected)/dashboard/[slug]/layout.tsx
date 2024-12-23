import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import InfoBar from "@/components/global/infobar";
import Sidebar from "@/components/global/sidebar";
import React from "react";
import { prefetchUserData } from "@/react-query/prefetch";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
  dehydratedState: DehydratedState;
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  //Hàm prefetchUserData được gọi với queryClient để prefetch dữ liệu. Điều này giúp chuẩn bị dữ liệu trước khi trang được render.
  await prefetchUserData(queryClient);
  const dehydratedState = dehydrate(queryClient);
  return {
    props: {
      //Sử dụng dehydrate từ React Query để biến đổi trạng thái hiện tại của query client thành định dạng có thể truyền qua props. Điều này giúp truyền dữ liệu đã được prefetch về phía client.
      dehydratedState: dehydratedState,
    },
  };
};

const Layout: React.FC<Props> = ({ children, params, dehydratedState }) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="p-3">
        <Sidebar slug={params.slug} />
        <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
          <InfoBar slug={params.slug} />
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
