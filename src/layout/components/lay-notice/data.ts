export interface ListItem {
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  description: string;
  status?: "primary" | "success" | "warning" | "info" | "danger";
  extra?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  emptyText: string;
}

export const noticesData: TabItem[] = [
  {
    key: "1",
    name: "系统通知",
    list: [],
    emptyText: "暂无通知",
  },
  {
    key: "2",
    name: "组织邀请",
    list: [],
    emptyText: "暂无消息",
  },
  {
    key: "3",
    name: "用户留言",
    list: [],
    emptyText: "暂无消息",
  },
];
