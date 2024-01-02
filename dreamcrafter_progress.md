---
layout: post
title: Dreamcrafter (In Progress)

show_tile: false
---

<ul class="actions">
	<li><a href="research.html" class="button small">Go back and see more research projects</a></li>
</ul>

## Overview
For my masters thesis, I am trying to create a system based on the proposal I made in 2022 [here](nerfenvironmentcreation.html). In my first semester (Fall 2023) of my 5th year masters program (1 yr program), two prototype systems were implemented which leverage NeRFs, 3DGS, and Stable Diffusion to create a VR interface for 3D photo-realistic content creation as part of a group I led for our final project in our VR/AR course. We call our system Dreamcrafter, a Virtual Reality 3D content generation and editing system assisted by generative AI. Our system attempts to address the gap in HCI-VR research in generative AI tools by proposing a system that enhances the process of 3D environment creation and editing. 

Integration of NeRF/3DGS and diffusion models into user-friendly platforms for 3D environment creation is still in its infancy. Editing of radiance fields and generative 3D objects is currently limited to text prompts or limited 2D interfaces. Current research in NeRFs and diffusion models is primarily on enhancing image/reconstruction quality, and we aim to address the noticeable lack of exploration in the application of user interfaces designed for editing and controllability of these models and novel 3D representations. 

The core of our approach is a VR-based system that allows users to interact with and manipulate 3D objects and environments in real-time. Dreamcrafter involves two subsystems which leverage novel 3D representations and stable diffusion. The stable diffusion powered system assigns semantically mapped spatial tags to 3D primitive objects to generate stable diffusion previews of scenes. Our second subsystem leverages NeRFs and 3D Gaussian Splatting for rendering and editing of 3D photo realistic scenes. Dreamcrafter is designed to be simple to use, lowering the barrier to entry for users without extensive experience in 3D modeling, while still providing realistic output results. 

Our current system is a proof-of-concept prototype which we developed within a month.

## Prototype Demos
Here are some demo videos of our prototype systems that demonstrate a basic version of some of the key features/interactions.

<center>
<video id="v0" width=700px controls>
	<source src="assets/videos/cs294_137_dreamcrafter_progress_vid.mp4" type="video/mp4" />
</video>
</center>

[Here]((https://cvachha.github.io/assets/pdfs/cs294_137_dreamcrafter_VR_final_paper.pdf)) is our in-class paper write-up on the system
<iframe src="assets/pdfs/cs294_137_dreamcrafter_VR_final_paper.pdf" width="100%" height="500px">
</iframe>

Here is a NeRF/GS capture of our class poster demo:
<center>
<iframe src="https://lumalabs.ai/embed/afc9f2d5-a1bc-4681-914a-5dd157938e33?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=true" width="600" height="500" frameborder="0" title="luma embed" style="border: none; border-radius: 20px"></iframe>
</center>

## Next steps
We are working towards a publication for UIST 24 and I am currently exploring incorporating other systems such as room based gpt LLM interactions for more intelligent selection and automatic object segmentation from an input NeRF/GS to edit specific objects.


<ul class="actions">
	<li><a href="research.html" class="button small">Go back and see more research projects</a></li>
</ul>

