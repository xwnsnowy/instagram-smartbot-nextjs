"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const ReactQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 15 * 60 * 1000, // 15 minutes
            gcTime: 30 * 60 * 1000, // 30 minutes
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

// Singleton Pattern: Hook useState đảm bảo rằng thể hiện QueryClient chỉ được tạo một lần, tránh việc tạo lại không cần thiết mỗi khi render. Điều này có lợi cho hiệu suất và tính nhất quán.

// Deferred Initialization: Hình thức hàm của useState (useState(() => ...)) cho phép khởi tạo trì hoãn, nghĩa là QueryClient chỉ được tạo khi component được gắn kết, không phải trong mọi lần render.

// Quản lý trạng thái: Việc sử dụng useState giúp giữ thể hiện QueryClient trong hệ thống quản lý trạng thái của React, đảm bảo nó hoạt động theo luồng render của React một cách có thể dự đoán.

// Kết luận:
// Sử dụng useState để khởi tạo QueryClient là cách tiếp cận tốt nhất vì nó đảm bảo client chỉ được tạo một lần và duy trì qua các lần render, dẫn đến hiệu suất tốt hơn và hành vi có thể dự đoán.
