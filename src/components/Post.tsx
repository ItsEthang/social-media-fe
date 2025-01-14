import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import { CardContent, CardMedia } from "@mui/material";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addComment,
  deletePost,
  likePost,
  unLikePost,
} from "../features/post/postSlice";
import { formatDate } from "../util/helper";
import { CommentType, PostType } from "../util/types";
import Comment from "./Comment";

import AddIcon from "@mui/icons-material/AddRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import { FormControl, Input } from "@mui/joy";
import { toast } from "react-toastify";
import LinkToProfile from "./LinkToProfile";

export default function Post({ post }: { post: PostType }) {
  const authStore = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const [commentInput, setCommentInput] = useState("");

  const [show, setShow] = useState(true);
  const [like, setLike] = useState(
    post.reactions.filter((r) => r == authStore.auth?.id!).length > 0
  );

  const [open, setOpen] = useState(false);

  async function handleDelete() {
    dispatch(deletePost(post.id)).then(() => { });
    setShow(false);
  }

  async function handleLike() {
    if (like) {
      dispatch(
        unLikePost({ postId: post.id, userId: authStore.auth?.id as number })
      );
      setLike(false);
    } else {
      dispatch(
        likePost({ postId: post.id, userId: authStore.auth?.id as number })
      );
      setLike(true);
    }
  }

  async function handleAddComment() {
    if (commentInput.length < 1) {
      toast.error("Comment cannot be empty.");
    } else {
      dispatch(
        addComment({
          postId: post.id,
          content: commentInput,
        })
      );
      setOpen(false);
    }
  }

  return (
    show && (
      <Card>
        <LinkToProfile username={post.user.username}>
          <CardHeader
            avatar={post.user &&
              <Avatar
                src={post.user.profilePicture}
                alt={`${post.user.username}'s profile picture`}
              />
            }
            sx={{
              height: 25,
              paddingLeft: 0
            }}
            title={post.user && post.user.username}
            subheader={formatDate(post.createdAt)}
          />
        </LinkToProfile>

        <Divider />

        <Stack
          direction="column"
          spacing={3}
          sx={{ display: { xs: "flex", md: "flex" }, my: 1 }}
          justifyContent="center"
        >
          {post.mediaURL && (
            <CardMedia component="img" height={500} image={post.mediaURL} />
          )}
          <CardContent
            sx={{
              height: 25,
              paddingLeft: 0,
            }}
          >
            <Typography data-testid={"postContent"}>{post.content}</Typography>
          </CardContent>

          <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            {post.user && authStore.auth?.id == post.user.id ? (
              <IconButton color="danger" onClick={handleDelete}>
                <DeleteForeverIcon />
              </IconButton>
            ) : (
              ""
            )}
            <IconButton
              color={like ? "danger" : undefined}
              onClick={handleLike}
            >
              <FavoriteIcon />
            </IconButton>
            {post.reactions.length}
            <IconButton
              onClick={() => {
                setOpen(!open);
              }}
            >
              {!open ? <AddIcon /> : <RemoveIcon />}
            </IconButton>
          </CardActions>
        </Stack>

        {(open || post.comments.length > 0) &&
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            {open && (
              <CardContent>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <FormControl
                      sx={{
                        display: { sm: "flex-column", md: "flex-row" },
                        gap: 2,
                      }}
                    >
                      <Input
                        size="sm"
                        placeholder="Add new comment"
                        name="content"
                        defaultValue={"" as string}
                        onChange={(e) => {
                          setCommentInput(e.target.value);
                        }}
                        required
                      />
                    </FormControl>
                    <Button size="sm" variant="solid" onClick={handleAddComment}>
                      Add Comment
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            )}
            {post.comments.length > 0 &&
              <CardContent
                sx={{ paddingInline: 0 }}
              >
                {post.comments.map((comment: CommentType) => {
                  return (
                    <Comment key={comment.id} comment={comment} postId={post.id} />
                  );
                })}
              </CardContent>
            }
          </CardOverflow>
        }
      </Card>
    )
  );
}
