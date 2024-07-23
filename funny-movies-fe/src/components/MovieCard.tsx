import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons"
import React, { useState } from "react"
import axios from "../utils/axios"
import { message } from "antd"

interface MovieCardProps {
  id: string
  title: string
  url: string
  sharedBy: string
  liked: boolean
  disliked: boolean
  likes: number
  dislikes: number
  description?: string
  isAuth: boolean
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  url,
  sharedBy,
  liked,
  disliked,
  likes,
  dislikes,
  description,
  isAuth,
}) => {
  const [likedLocal, setLikedLocal] = useState(liked)
  const [dislikedLocal, setDislikedLocal] = useState(disliked)
  const [likedNumber, setLikedNumber] = useState(likes)
  const [dislikedNumber, setDislikedNumber] = useState(dislikes)

  const handleLike = async () => {
    if (!isAuth) {
      message.info("Please login to like/dislike")
      return
    }
    try {
      if (dislikedLocal) {
        setDislikedNumber(dislikedNumber - 1)
        setDislikedLocal(false)
      }
      if (likedLocal) {
        setLikedLocal(false)
        setLikedNumber(likedNumber - 1)
        await axios.post(`/movie/${id}/unlike`)
      } else {
        setLikedLocal(true)
        setLikedNumber(likedNumber + 1)
        await axios.post(`/movie/${id}/like`)
      }
    } catch (error) {
      console.error("Failed to like the movie", error)
    }
  }

  const handleDislike = async () => {
    if (!isAuth) {
      message.info("Please login to like/dislike")
      return
    }
    try {
      if (likedLocal) {
        setLikedNumber(likedNumber - 1)
        setLikedLocal(false)
      }
      if (dislikedLocal) {
        setDislikedLocal(false)
        setDislikedNumber(dislikedNumber - 1)
        await axios.post(`/movie/${id}/undislike`)
      } else {
        setDislikedLocal(true)
        setDislikedNumber(dislikedNumber + 1)
        await axios.post(`/movie/${id}/dislike`)
      }
    } catch (error) {
      console.error("Failed to dislike the movie", error)
    }
  }

  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]
    return `https://www.youtube.com/embed/${videoId}`
  }
  return (
    <div className="flex flex-col md:flex-row p-4 border-b-2">
      <div className="flex justify-center md:w-1/3 mb-4 md:mb-0">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            title={title}
            src={getEmbedUrl(url)}
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="md:w-2/3 pl-0 md:pl-4">
        <h2 className="text-xl font-bold text-red-500">{title}</h2>
        <p>Shared by: {sharedBy}</p>
        <p>
          {likedNumber}{" "}
          <span className="cursor-pointer" onClick={handleLike}>
            {likedLocal ? <LikeFilled /> : <LikeOutlined />}
          </span>{" "}
          {dislikedNumber}{" "}
          <span className="cursor-pointer" onClick={handleDislike}>
            {dislikedLocal ? <DislikeFilled /> : <DislikeOutlined />}
          </span>
        </p>
        <p>Description: {description}</p>
      </div>
    </div>
  )
}

export default MovieCard
