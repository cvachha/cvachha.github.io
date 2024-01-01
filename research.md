---
title: Research
layout: landing
description: 'Research projects and publications'
image: assets/images/jacobsHall.jpg
nav-menu: true
menu-show: true
---

<!-- Main -->
<div id="main">

<!-- One -->
<section id="one">
	<div class="inner">
		<header class="major">
			<h2>Publications and Projects</h2>
		</header>
		<p></p>
	</div>
</section>

<!-- Two -->
<div class="inner">

<section id="two" class="spotlights" >
	<section>
		<a href="https://instruct-gs2gs.github.io/" class="image">
			<img src="{% link assets/images/igs2gs_face.gif %}" alt="" data-position="center center" valign="center" style="border-radius: 20px"/>
		</a>
		<div class="content">
			<div class="inner">
				<header class="major">
					<h3>Instruct-GS2GS</h3>
				</header>
				<p style="font-size: 12pt">Authors: <b>Cyrus Vachha</b> and Ayaan Haque (2023)</p>
				<p style="font-size: 12pt">We propose a method for editing 3D Gaussian Splatting (3DGS) scenes with text-instructions in a method similar to Instruct-NeRF2NeRF. Given a 3DGS scene of a scene and the collection of images used to reconstruct it, our method uses an image-conditioned diffusion model (InstructPix2Pix) to iteratively edit the input images while optimizing the underlying scene, resulting in an optimized 3D scene that respects the edit instruction. We demonstrate that our proposed method is able to edit large-scale, real-world scenes, and is able to accomplish more realistic, targeted edits than prior work.
				<br>
				- Paper coming soon
				<br>
				- Nerfstudio integration supported
				</p>
				<ul class="actions">
					<li><a href="https://instruct-gs2gs.github.io/" class="button">Project Page</a></li>
					<li><a href="https://github.com/cvachha/instruct-gs2gs" class="button">Code</a></li>
				</ul>
			</div>
		</div>
	</section>
</section>

<section id="two" class="spotlights">
	<section>
		<a href="https://docs.nerf.studio/extensions/blender_addon.html" class="image">
			<img src="{% link assets/images/nerfstudio_teaser_1.gif %}" alt="" data-position="center center" style="border-radius: 20px"/>
		</a>
		<div class="content">
			<div class="inner">
				<header class="major">
					<h3>Nerfstudio Blender VFX Add-on</h3>
				</header>
				<p style="font-size: 12pt">Author: <b>Cyrus Vachha</b> (2023)</p>
				<p style="font-size: 12pt">We present a pipeline for integrating NeRFs into traditional compositing VFX pipelines using Nerfstudio, an open-source framework for training and rendering NeRFs. Our approach involves using Blender, a widely used open-source 3D creation software, to align camera paths and composite NeRF renders with meshes and other NeRFs, allowing for seamless integration of NeRFs into traditional VFX pipelines. Our NeRF Blender add-on allows for more controlled camera trajectories of photorealistic scenes, compositing meshes and other environmental effects with NeRFs, and compositing multiple NeRFs in a single scene. This approach of generating NeRF aligned camera paths can be adapted to other 3D tool sets and workflows, enabling a more seamless integration of NeRFs into visual effects and film production.
				<br>
				- Shown in CVPR 2023 Art Gallery
				<br>
				- Arxiv submission in progress</p>
				<ul class="actions">
					<li><a href="https://docs.nerf.studio/extensions/blender_addon.html" class="button">Documentation</a></li>
					<li><a href="https://www.youtube.com/watch?v=A7La8tWp_0I" class="button">Video</a></li>
					<li><a href="https://cvachha.github.io/assets/pdfs/nerf_vfx_abstract.pdf" class="button">View Abstract</a></li>
				</ul>
			</div>
		</div>
	</section>
</section>


<section id="two" class="spotlights">
	<section>
		<a href="https://arxiv.org/abs/2311.14930" class="image">
			<img src="{% link assets/images/streamfunnel_teaser.png %}" alt="" data-position="center center" style="border-radius: 20px"/>
		</a>
		<div class="content">
			<div class="inner">
				<header class="major">
					<h3>StreamFunnel</h3>
				</header>
				<p style="font-size: 12pt">Authors: Haohua Lyu, <b>Cyrus Vachha</b>, Qianyi Chen, Balasaravanan Thoravi Kumaravel, Bjöern Hartmann (2023)</p>
				<p style="font-size: 12pt">The increasing adoption of Virtual Reality (VR) systems in different domains have led to a need to support interaction between many spectators and a VR user. This is common in game streaming, live performances, and webinars. Prior CSCW systems for VR environments are limited to small groups of users. In this work, we identify problems associated with interaction carried out with large groups of users. To address this, we introduce an additional user role: the co-host. They mediate communications between the VR user and many spectators. To facilitate this mediation, we present StreamFunnel, which allows the co-host to be part of the VR application's space and interact with it. The design of StreamFunnel was informed by formative interviews with six experts. StreamFunnel uses a cloud-based streaming solution to enable remote co-host and many spectators to view and interact through standard web browsers, without requiring any custom software. We present results of informal user testing which provides insights into StreamFunnel's ability to facilitate these scalable interactions. Our participants, who took the role of a co-host, found that StreamFunnel enables them to add value in presenting the VR experience to the spectators and relaying useful information from the live chat to the VR user.</p>
				<ul class="actions">
					<li><a href="https://arxiv.org/abs/2311.14930" class="button">View Publication (Arxiv)</a></li>
				</ul>
			</div>
		</div>
	</section>
</section>

<section id="two" class="spotlights">
	<section>
		<a href="https://dl.acm.org/doi/abs/10.1145/3491101.3519816" class="image">
			<img src="{% link assets/images/webtransceivr_teaser_img.PNG %}" alt="" data-position="center center" style="border-radius: 20px" />
		</a>
		<div class="content">
			<div class="inner">
				<header class="major">
					<h3>WebTransceiVR (CHI 22)</h3>
				</header>
				<p style="font-size: 12pt">Authors: Haohua Lyu, <b>Cyrus Vachha</b>, Qianyi Chen, Odysseus Pyrinis, Avery Liou, Balasaravanan Thoravi Kumaravel, Bjöern Hartmann (2022)</p>
				<p style="font-size: 12pt">We propose WebTransceiVR, an asymmetric collaboration toolkit which when integrated into a VR application, allows multiple non-VR users to share the virtual space of the VR user. It allows external users to enter and be part of the VR application’s space through standard web browsers on mobile and computers. WebTransceiVR also includes a cloud-based streaming solution that enables many passive spectators to view the scene through any of the active cameras. We conduct informal user testing to gain additional insights for future work.</p>
				<ul class="actions">
					<li><a href="https://dl.acm.org/doi/abs/10.1145/3491101.3519816" class="button">View Publication (ACM)</a></li>
					<li><a href="https://www.youtube.com/watch?v=UQTCGifpjm8" class="button">View Video</a></li>
				</ul>
			</div>
		</div>
	</section>
</section>


<section id="three">
	<div class="inner">
		<header class="major">
			<h2>Future/Current Research Projects</h2>
		</header>
		<p>I am also working on a project in capturing, creating, and viewing synthetic NeRF environments in VR for my masters thesis.</p>
		<p></p>
	<section id="two" class="spotlights">
	<section>
		<a href="https://docs.nerf.studio" class="image">
			<img src="{% link assets/images/dreamcrafter_progress_teaser.png %}" alt="" data-position="center center" style="border-radius: 20px" />
		</a>
		<div class="content">
			<div class="inner">
				<header class="major">
					<h3>Dreamcrafter (In Progress)</h3>
				</header>
				<p style="font-size: 12pt">In my current 5th-year masters program (1 year graduate program after 4 year undergrad degree), I am attempting to build the initial concept of the VR environment creation system I proposed in 2022. For my VR/AR class I worked with a team to implement two prototype systems which leverage NeRFs, 3DGS, and Stable Diffusion to create a VR interface for 3D photo-realistic content creation. This includes a system to edit existing NeRF/GS scenes through voice, hand controls, and existing diffusion models (such as Instruct-Pix2Pix). We also have a system leveraging ControlNet to create 2D mockups of scenes based on 3D primitive objects. I am currently developing the complete system with intelligent natural language region selection and additional features. We are working towards a research publication for 2024.</p>
				<!--<ul class="actions">
					<li><a href="dreamcrafter_progress.html" class="button">Learn More</a></li>
				</ul>-->
			</div>
		</div>
	</section>
	<section>
		<a href="https://docs.nerf.studio" class="image">
			<img src="{% link assets/images/nerfstudio_logo.gif %}" alt="" data-position="center center" style="border-radius: 20px" />
		</a>
		<div class="content">
			<div class="inner">
				<header class="major">
					<h3>Nerfstudio Contributions</h3>
				</header>
				<p style="font-size: 12pt">Since Jan 2023, I have been contributing features to the Nerfstudio system including the Blender VFX add-on and VR180/Omnidirectional (VR 360) video/image render outputs.</p>
				<ul class="actions">
					<li><a href="nerfstudio_contributions.html" class="button">Learn More</a></li>
				</ul>
			</div>
		</div>
	</section>
</section>
	</div>
</section>

</div>
<!--
	<section>
		<a href="generic.html" class="image">
			<img src="{% link assets/images/pic09.jpg %}" alt="" data-position="top center" />
		</a>
		<div class="content">
			<div class="inner">
				<header class="major">
					<h3>Streaming toolkit</h3>
				</header>
				<p>Other</p>
				<ul class="actions">
					<li><a href="generic.html" class="button">Learn more</a></li>
				</ul>
			</div>
		</div>
	</section>
	<section>
		<a href="generic.html" class="image">
			<img src="{% link assets/images/pic10.jpg %}" alt="" data-position="25% 25%" />
		</a>
		<div class="content">
			<div class="inner">
				<header class="major">
					<h3>NeRFs</h3>
				</header>
				<p>Learning</p>
				<ul class="actions">
					<li><a href="generic.html" class="button">Learn more</a></li>
				</ul>
			</div>
		</div>
	</section>
</section>
-->


