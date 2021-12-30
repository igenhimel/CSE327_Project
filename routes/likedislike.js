router.put("/:id/like", async(req, res) => {
    try {

        const post = await Post.findByID(req.params.id);
        if (!post.like.includes(req.body.userID)) {
            await post.updateOne({
                $push: { like: req.body.userID }
            });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({
                $pull: { like: req.body.userID }
            });
            res.status(200).json("THe post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});