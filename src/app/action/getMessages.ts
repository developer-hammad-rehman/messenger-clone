import prisma from '@/lib/prisma'
const getMessage = async(
    conversationId:string
) =>{
    try {
        const messages = await prisma.message.findMany({
            where:{
                conversationId:conversationId
            },
            include:{
              sender:true,
              seen:true  
            },
            orderBy:{
                createdAt:'asc'
            }
        })
        return messages
    } catch (error) {
        return[]
    }
}
export default getMessage