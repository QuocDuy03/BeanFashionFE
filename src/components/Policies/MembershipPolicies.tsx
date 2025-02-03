import { Space, Typography } from "antd"
import { useEffect } from "react";
const { Title, Text } = Typography
import { policiesInfo } from "./policiesInfo"

const MembershipPolicies = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  },[]);
  return (
    <>
    {policiesInfo.map((policy) => {
      if (policy.header === 'MembershipPolicies') {
        return (
          <Space direction="vertical" className="mx-5 w-1200 max-w-7xl text-1px text-black pb-5 ml-12 text-left gap-4" key={policy.header}>
            {policy.info.map((data) => {
              if (data.title) {
                return <Title level={4} className="uppercase" key={data.id}>{data.title}</Title>
              } else {
                return <Text key={data.id}>{data.text}</Text>
              }
            })}
          </Space>
        )
      }
    })}
    </>
  )
}

export default MembershipPolicies