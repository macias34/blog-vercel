<nav>
  <div class="admin__controls">
    <a href="/admin/" class="admin__control">
      <i class="fa-regular fa-clone" />
    </a>
    <a href="/admin/categories" class="admin__control">
      <i class="fa-solid fa-tags" />
    </a>
    <a href="/admin/images" class="admin__control">
      <i class="fa-solid fa-image" />
    </a>
    <a href="/" class="admin__control">
      <i class="fa-solid fa-house" />
    </a>
  </div>
</nav>

<style lang="scss">
  nav {
    width: 7vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    .admin__controls {
      width: 65%;
      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .admin__control {
        height: 20%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        color: gray;
        font-size: 2rem;
        cursor: pointer;
        transition: 0.2s;
        text-decoration: none;

        &:hover {
          background-color: royalblue;
          color: white;
        }
      }
    }
  }
</style>
