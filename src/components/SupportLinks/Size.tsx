import { Space, Typography } from "antd"
import { useEffect } from "react"
const { Title, Text } = Typography
import { supportLinksInfo } from "./supportLinksInfo"

const Size = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  },[]);
  return (
    <>
    {supportLinksInfo.map((supportLink) => {
      if (supportLink.header === 'Size') {
        return (
          <Space direction="vertical" className="mx-5 w-1200 max-w-7xl text-1px text-black pb-5 ml-12 text-left gap-4" key={supportLink.header}>
            {supportLink.info.map((data) => {
              if (data.title) {
                return <Title level={4} className="uppercase" key={data.id}>{data.title}</Title>
              } else if (data.subTitle) {
                return <Title level={5} className="uppercase" key={data.id}>{data.subTitle}</Title>
              } else if (data.sourceImg) {
                return (
                <div key={data.id}>
                    <img src={data.sourceImg} alt={data.id} />
                    <br />
                </div>
              )}
               else {
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
export default Size