let search = document.getElementById('search');
search.addEventListener('keyup', filterResults);
function filterResults() {
  let searchValue = document.getElementById('search').value.toUpperCase();
  let posts = document.getElementById('postsIndex');
  let postTitle = posts.getElementById('post-category-title');

  for (let i = 0; i < postTitle.length; i++) {
    let a = postTitle[i].getElementsByTagName('a')[0];
    if (a.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
      postTitle[
        i
      ].parentElement.parentElement.parentElement.parentElement.style.display =
        '';
    } else {
      postTitle[
        i
      ].parentElement.parentElement.parentElement.parentElement.style.display =
        'none';
    }
  }
}
