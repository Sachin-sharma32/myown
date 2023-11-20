const query = `*[_type == "post"]{
  _id,likes,title,image,publishedAt,UpdatedAt,bestPost,topPostOfTheWeek,featuredPost,readTime,summery,content,
  author->{_id,bio,education,email,image,location,name,work},
  tags[]->{_id,title,footer,recommended},
  category->{_id,title,recommended,header,footer},
  comments[]->{_id,comment,email,likes,name,publishedAt},
  likes[]->{_id}
}`;

export default query;
